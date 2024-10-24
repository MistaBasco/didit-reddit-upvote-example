import { db } from "@/db";
import { CommentForm } from "./CommentForm";
import Image from "next/image";
import Link from "next/link";

export async function CommentList({ postId, parentCommentId = null }) {
  const commentQuery = `SELECT comments.id, comments.body, comments.user_id, users.name, users.image FROM comments JOIN users ON comments.user_id = users.id WHERE post_id = $1 AND parent_comment_id ${
    parentCommentId ? `= $2` : `IS NULL`
  }`;
  const commentArgs = [postId];

  if (parentCommentId) {
    commentArgs.push(parentCommentId);
  }
  const comments = await db.query(commentQuery, commentArgs);

  console.log(comments.rows);

  return (
    <ul className="ml-4">
      {comments.rows.map((comment) => (
        <li key={comment.id} className="pt-2">
          <div className="flex space-x-3 items-center pb-2">
            <Image
              src={comment.image}
              alt={comment.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <Link href={`/user/${comment.user_id}`}>
              <span className="font-bold text-zinc-400">{comment.name}</span>
            </Link>
          </div>
          <div className="ml-4 border-l border-zinc-300 pl-2 flex flex-col space-y-1">
            <span className="pl-4">{comment.body}</span>
            <CommentForm postId={postId} parentCommentId={comment.id} />
            <CommentList postId={postId} parentCommentId={comment.id} />
          </div>
        </li>
      ))}
    </ul>
  );
}
