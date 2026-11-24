import usePost from "../_hooks/usePost";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loading from "../loading";

export default function PostInfo({
  postState,
}: {
  postState: ReturnType<typeof usePost>;
}) {
  const router = useRouter();
  const { post } = postState;

  const deletePost = () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    postState.deletePost((data) => {
      alert(data.msg);

      router.replace("/posts");
    });
  };

  if (post == null) return <Loading />;

  return (
    <>
      <h1>글 상세페이지</h1>

      <div>번호 : {post.id}</div>
      <div>제목 : {post.title}</div>
      <div style={{ whiteSpace: "pre-line" }}>{post.content}</div>

      <div className="flex gap-2">
        <button
          className="p-2 rounded border cursor-pointer"
          onClick={deletePost}
        >
          삭제
        </button>
        <Link className="p-2 rounded border" href={`/posts/${post.id}/edit`}>
          수정
        </Link>
      </div>
    </>
  );
}