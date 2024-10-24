"use client";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import clsx from "clsx";
import {
  TbArrowBigDown,
  TbArrowBigDownFilled,
  TbArrowBigUp,
  TbArrowBigUpFilled,
} from "react-icons/tb";
import { FaSpinner } from "react-icons/fa";

export function VoteButtons({
  upvote,
  downvote,
  votes,
  existingVote,
  isLoggedIn,
}) {
  const { pending } = useFormStatus();
  const [error, setError] = useState(null);

  async function handleUpvote() {
    if (!isLoggedIn) {
      setError("You must be logged in to vote.");
      return;
    }
    try {
      await upvote();
      setError(null); // Clear the error on successful vote
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDownvote() {
    if (!isLoggedIn) {
      setError("You must be logged in to vote.");
      return;
    }
    try {
      await downvote();
      setError(null); // Clear the error on successful vote
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button formAction={handleUpvote} disabled={pending}>
        {existingVote?.vote === 1 ? (
          <TbArrowBigUpFilled
            size={24}
            className={clsx("hover:text-orange-600", {
              "text-pink-300": existingVote?.vote === 1,
            })}
          />
        ) : (
          <TbArrowBigUp
            size={24}
            className={clsx("hover:text-orange-600", {
              "text-pink-300": existingVote?.vote === 1,
            })}
          />
        )}
      </button>
      <span className="w-6 text-center tabular-nums">
        {pending ? (
          <span className="animate-spin h-6  w-6 flex items-center justify-center">
            <FaSpinner />
          </span>
        ) : (
          votes
        )}
      </span>
      <button formAction={handleDownvote} disabled={pending}>
        {existingVote?.vote === -1 ? (
          <TbArrowBigDownFilled
            size={24}
            className={clsx("hover:text-blue-600", {
              "text-blue-300": existingVote?.vote === -1,
            })}
          />
        ) : (
          <TbArrowBigDown
            size={24}
            className={clsx("hover:text-blue-600", {
              "text-blue-300": existingVote?.vote === -1,
            })}
          />
        )}
      </button>
    </>
  );
}
