"use client";
import { useParams } from "next/navigation";
import Loading from "./loading";
import usePost from "./_hooks/usePost";
import usePostComments from "./_hooks/usePostComments";
import PostInfo from "./_components/PostInfo";

export default function Page() {
  const { id: idStr } = useParams<{ id: string }>();
  const id = parseInt(idStr);

  const postState = usePost(id);
  const { post } = postState;

  const postCommentsState = usePostComments(id);
  const { postComments } = postCommentsState;

  

  const deleteComment = (commentId: number) => {
    if (!confirm(`${commentId}번 댓글을 정말 삭제하시겠습니까?`)) return;

    postCommentsState.deleteComment(commentId, (data) => {
      alert(data.msg);
    });
  };

  const handleCommentWriteSubmit = (
    e: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const form = e.currentTarget;

    const contentTextarea = form.elements.namedItem(
      "content",
    ) as HTMLTextAreaElement;

    contentTextarea.value = contentTextarea.value.trim();

    if (contentTextarea.value.length === 0) {
      alert("댓글 내용을 입력해주세요.");
      contentTextarea.focus();

      return;
    }

    if (contentTextarea.value.length < 2) {
      alert("댓글 내용을 2자 이상 입력해주세요.");
      contentTextarea.focus();

      return;
    }

    postCommentsState.writeComment(contentTextarea.value, (data) => {
      alert(data.msg);

      contentTextarea.value = "";
    });
  };

  if (post == null) return <Loading />;

  return (
    <>
      <PostInfo postState={postState} />

      <h2>댓글 작성</h2>

      <form
        className="flex flex-col gap-2 p-2"
        onSubmit={handleCommentWriteSubmit}
      >
        <textarea
          className="border p-2 rounded"
          name="content"
          placeholder="댓글 내용"
          maxLength={100}
          rows={3}
        />
        <button className="border p-2 rounded cursor-pointer" type="submit">
          작성
        </button>
      </form>

      <h2>댓글 목록</h2>

      {postComments == null && <div>댓글 로딩중...</div>}

      {postComments != null && postComments.length == 0 && (
        <div>댓글이 없습니다.</div>
      )}

      {postComments != null && postComments.length > 0 && (
        <ul>
          {postComments.map((comment) => (
            <li key={comment.id} className="flex gap-2 items-start">
              <span>{comment.id} :</span>
              <span style={{ whiteSpace: "pre-line" }}>{comment.content}</span>
              <button
                className="px-2 rounded border cursor-pointer"
                onClick={() => deleteComment(comment.id)}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
