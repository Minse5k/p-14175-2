import usePostComments from "../_hooks/usePostComments";

export default function PostCommentList({
  postCommentsState,
}: {
  postCommentsState: ReturnType<typeof usePostComments>;
}) {
  const { postComments } = postCommentsState;

  const deleteComment = (commentId: number) => {
    if (!confirm(`${commentId}번 댓글을 정말 삭제하시겠습니까?`)) return;

    postCommentsState.deleteComment(commentId, (data) => {
      alert(data.msg);
    });
  };

  return (
    <>
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
