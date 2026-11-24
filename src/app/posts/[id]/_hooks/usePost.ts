import { apiFetch } from "@/lib/backend/client";
import { PostWithContentDto } from "@/type/post";
import { useEffect, useState } from "react";

export default function usePost(id: number) {
  const [post, setPost] = useState<PostWithContentDto | null>(null);

  useEffect(() => {
    apiFetch(`/api/v1/posts/${id}`)
      .then(setPost)
      .catch((error) => alert(error.message));
  }, [id])

  const deletePost = (onSuccess: (data: { msg: string }) => void) => {
    apiFetch(`/api/v1/posts/${id}`, {
      method: "DELETE",
    }).then(onSuccess)
      .catch((error) => alert(error.message));
  }

  const modifyPost = (
    title: string,
    content: string,
    onSuccess: (data: { msg: string }) => void
  ) => {
    apiFetch(`/api/v1/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    }).then(onSuccess)
      .catch((error) => alert(error.message));
  }

  return { post, deletePost, modifyPost }
}