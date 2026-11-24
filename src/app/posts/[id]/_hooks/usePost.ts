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

  return { post }
}