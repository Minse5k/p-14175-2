import type { PostCommentDto } from "@/type/post";
import usePostComments from "../_hooks/usePostComments";

export default function PostCommentListItem({
  comment,
  postCommentsState,
}: {
  comment: PostCommentDto;
  postCommentsState: ReturnType<typeof usePostComments>;
}) {
  const deleteComment = () => {
    if (!confirm(`${comment.id}번 댓글을 정말 삭제하시겠습니까?`)) return;

    postCommentsState.deleteComment(comment.id, (data) => {
      alert(data.msg);
    });
  };

  return (
    <li className="flex gap-2 items-start">
      <span>{comment.id} :</span>
      <span style={{ whiteSpace: "pre-line" }}>{comment.content}</span>
      <button
        className="px-2 rounded border cursor-pointer"
        onClick={deleteComment}
      >
        삭제
      </button>
    </li>
  );
}
