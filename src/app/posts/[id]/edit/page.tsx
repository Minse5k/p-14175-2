"use client";

import { useParams, useRouter } from "next/navigation";
import Loading from "../loading";
import usePost from "../_hooks/usePost";

export default function Page() {
  const router = useRouter();
  const { id: idStr } = useParams<{ id: string }>();

  const id = parseInt(idStr);
  const postState = usePost(id);
  const {post} = postState;

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const titleInput = form.elements.namedItem("title") as HTMLInputElement;
    const contentTextarea = form.elements.namedItem(
      "content",
    ) as HTMLTextAreaElement;

    titleInput.value = titleInput.value.trim();

    if (titleInput.value.length === 0) {
      alert("제목을 입력해주세요.");
      titleInput.focus();

      return;
    }

    if (titleInput.value.length < 2) {
      alert("제목을 2자 이상 입력해주세요.");
      titleInput.focus();

      return;
    }

    contentTextarea.value = contentTextarea.value.trim();

    if (contentTextarea.value.length === 0) {
      alert("내용을 입력해주세요.");
      contentTextarea.focus();

      return;
    }

    if (contentTextarea.value.length < 2) {
      alert("내용을 2자 이상 입력해주세요.");
      contentTextarea.focus();

      return;
    }

    postState.modifyPost(titleInput.value, contentTextarea.value, (data) => {
      alert(data.msg);
      router.replace(`/posts/${id}`);
    })
  };

  if (post == null) return <Loading />;

  return (
    <>
      <h1>{post.id}번 글 수정</h1>

      <form className="flex flex-col gap-2 p-2" onSubmit={handleSubmit}>
        <input
          className="border p-2 rounded"
          type="text"
          name="title"
          placeholder="제목"
          maxLength={100}
          defaultValue={post.title}
          autoFocus
        />
        <textarea
          className="border p-2 rounded"
          name="content"
          placeholder="내용"
          maxLength={5000}
          rows={10}
          defaultValue={post.content}
        />
        <button className="border p-2 rounded cursor-pointer" type="submit">
          수정
        </button>
      </form>
    </>
  );
}
