"use client";

import { useParams } from "next/navigation";
import Loading from "./loading";
import usePost from "./_hooks/usePost";
import usePostComments from "./_hooks/usePostComments";
import PostInfo from "./_components/PostInfo";
import PostCommentWriteAndList from "./_components/PostCommentWriteAndList";

export default function Page() {
  const { id: idStr } = useParams<{ id: string }>();
  const id = parseInt(idStr);

  const postState = usePost(id);
  const { post } = postState;

  const postCommentsState = usePostComments(id);

  if (post == null) return <Loading />;

  return (
    <>
      <PostInfo postState={postState} />

      <PostCommentWriteAndList postCommentsState={postCommentsState} />
    </>
  );
}
