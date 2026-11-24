import { apiFetch } from "@/lib/backend/client";
import type { PostCommentDto } from "@/type/post";
import { useEffect, useState } from "react";

export default function usePostComments(postId: number) {
  const [postComments, setPostComments] = useState<PostCommentDto[] | null>(
    null,
  );

  useEffect(() => {
    apiFetch(`/api/v1/posts/${postId}/comments`)
      .then(setPostComments)
      .catch((error) => alert(error.message));
  }, [postId]);

  const deleteComment = (
    commentId: number,
    onSuccess: (data: { msg: string }) => void,
  ) => {
    apiFetch(`/api/v1/posts/${postId}/comments/${commentId}`, {
      method: "DELETE",
    })
      .then((data) => {
        onSuccess(data);

        if (postComments == null) return;

        setPostComments(
          postComments.filter((comment) => comment.id != commentId),
        );
      })
      .catch((error) => alert(error.message));
  };

  const writeComment = (
    content: string,
    onSuccess: (data: { msg: string }) => void,
  ) => {
    apiFetch(`/api/v1/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify({ content }),
    })
      .then((data) => {
        onSuccess(data);

        if (postComments == null) return;

        setPostComments([...postComments, data.data]);
      })
      .catch((error) => alert(error.message));
  };




  const modifyComment = (
    commentId: number,
    content: string,
    onSuccess: (data: { msg: string }) => void,
  ) => {
    apiFetch(`/api/v1/posts/${postId}/comments/${commentId}`, {
      method: "PUT",
      body: JSON.stringify({ content }),
    })
      .then((data) => {
        onSuccess(data);

        if (postComments == null) return;

        setPostComments(
          postComments.map((comment) =>
            comment.id == commentId ? { ...comment, content } : comment,
          ),
        );
      })
      .catch((error) => alert(error.message));
  };

  return { postId, postComments, deleteComment, writeComment, modifyComment };
}
