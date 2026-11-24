import type { PostCommentDto } from "@/type/post";
import { useState } from "react";
import usePostComments from "../_hooks/usePostComments";

export default function PostCommentListItem({
  comment,
  postCommentsState,
}: {
  comment: PostCommentDto;
  postCommentsState: ReturnType<typeof usePostComments>;
}) {
  const [modifyMode, setModifyMode] = useState(false);

  const toggleModifyMode = () => {
    setModifyMode(!modifyMode);
  };

  const deleteComment = () => {
    if (!confirm(`${comment.id}번 댓글을 정말 삭제하시겠습니까?`)) return;

    postCommentsState.deleteComment(comment.id, (data) => {
      alert(data.msg);
    });
  };

  return (
    <li className="flex gap-2 items-start">
      <span>{comment.id} :</span>
      <button
        className="px-2 rounded border cursor-pointer"
        onClick={deleteComment}
      >
        삭제
      </button>
      {!modifyMode && (
        <span style={{ whiteSpace: "pre-line" }}>{comment.content}</span>
      )}

      {modifyMode && (
        <form
          className="flex gap-2 items-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <textarea
            className="border p-2 rounded"
            name="content"
            placeholder="댓글 내용"
            maxLength={100}
            rows={5}
            defaultValue={comment.content}
          />
          <button className="p-2 rounded border cursor-pointer" type="submit">
            저장
          </button>
        </form>
      )}
      <button
        className="px-2 rounded border cursor-pointer"
        onClick={toggleModifyMode}
      >
        {modifyMode ? "수정취소" : "수정"}
      </button>
    </li>
  );
}
