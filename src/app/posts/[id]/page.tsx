"use client"

import { apiFetch } from "@/lib/backend/client";
import { PostWithContentDto } from "@/type/post";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./loading";

export default function Page() {
  const router = useRouter();
  const {id} = useParams<{id: string}>();

  const [post, setPost] = useState<PostWithContentDto | null>(null);

  const deletePost = (id: number) => {
    if(!confirm("정말 삭제하시겠습니까?")) return;

    apiFetch(`/api/v1/posts/${id}`, {
      method: "DELETE",
    }).then((data) => {
      alert(data.msg);

      router.replace("/posts");
    })
  }

  useEffect(() => {
    apiFetch(`/api/v1/posts/${id}`).then(setPost);
  }, [id]);

  if(post == null) return <Loading />;

  return(
    <>
      <h1>글 상세페이지</h1>

      <div>번호 : {post.id}</div>
      <div>제목 : {post.title}</div>
      <div style={{ whiteSpace: "pre-line" }}>{post.content}</div>

      <div className="flex gap-2">
        <button className="p-2 rounded border cursor-pointer" onClick={() => deletePost(post.id)}>
          삭제
        </button>
      </div>
    </>
  )
}