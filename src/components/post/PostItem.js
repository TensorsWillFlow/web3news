import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleUp,
  faArrowAltCircleDown,
  faEye,
  faCommentAlt,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

import { downvote, upvote } from "../../store/actions/interaction";
import Tag from "./Tag";
import SaveToReadingListIcon from "./SaveIcon";

const PostItem = ({ id }) => {
  const { user, isLoggedIn } = useSelector((state) => state.authReducer);
  const {
    title,
    url,
    description,
    createdAt,
    interactions,
    voteTotal,
    views,
    tag,
    comments,
  } = useSelector((state) =>
    state.postReducer.posts.find((post) => post.id === id)
  );
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [voteColor, setVoteColor] = useState("");
  const [votes, setVotes] = useState(voteTotal);
  const date = new Date(createdAt).toLocaleString();
  const dispatch = useDispatch();

  useEffect(() => {
    const userInteractions = interactions.find(
      (item) => item.userID === user.id
    );
    if (userInteractions)
      if (userInteractions.upvote) setUpvoted(userInteractions.upvote);
      else if (!userInteractions.upvote) setDownvoted(!userInteractions.upvote);
  }, [user, interactions]);

  useEffect(() => {
    if (upvoted) setVoteColor("vote-total-increase");
    else if (downvoted) setVoteColor("vote-total-decrease");
    setTimeout(() => {
      setVoteColor("");
    }, 5000);
  }, [votes, upvoted, downvoted]);

  const onUpvote = (e) => {
    if (user && isLoggedIn) {
      if (!upvoted) {
        dispatch(upvote({ postID: id, userID: user.id }))
          .then((res) => {
            setUpvoted(true);
            setDownvoted(false);
            setVotes(votes + 1);
            toast.success("TO THE MOON! 🚀");
          })
          .catch((err) => {
            toast.error(
              "Upvoted failed. Please ensure that you are logged in!"
            );
          });
      }
    } else toast.error("Not logged in. Please login to vote on posts.");
  };

  const onDownvote = (e) => {
    if (user && isLoggedIn) {
      if (!downvoted) {
        dispatch(downvote({ postID: id, userID: user.id }))
          .then((res) => {
            setDownvoted(true);
            setUpvoted(false);
            setVotes(votes - 1);
            toast.error("DUMP IT! 💩");
          })
          .catch((err) => {
            toast.error(
              "Downvoted failed. Please ensure that you are logged in!"
            );
          });
      }
    } else toast.error("Not logged in. Please login to vote on posts.");
  };

  const getVoteIcons = () => {
    return (
      <div
        className="flex"
        // data-aos="fade-up"
        // data-aos-offset="250"
        // data-aos-delay="50"
        // data-aos-duration="800"
        // data-aos-easing="ease-in-out"
        // data-aos-mirror="true"
        // data-aos-once="true"
        // data-aos-anchor-placement="top-bottom"
      >
        <div className="text-center mr-3 border-r-2 pr-3 text-2xl justify-self-center text-darkblue-500">
          <p className={`mt-4 ${voteColor}`}>{votes}</p>
        </div>
        <div className="">
          <span className="icon post-vote">
            <FontAwesomeIcon
              icon={faArrowAltCircleUp}
              size="2x"
              className={upvoted ? "text-darkblue-100" : "cursor-pointer"}
              onClick={onUpvote}
            />
          </span>
          <span className="icon post-vote">
            <FontAwesomeIcon
              icon={faArrowAltCircleDown}
              size="2x"
              className={downvoted ? "text-darkblue-100" : "cursor-pointer"}
              onClick={onDownvote}
            />
          </span>
        </div>
      </div>
    );
  };

  const saveToReadingList = () => {
    console.log("Saved post to reading list~");
  };

  return (
    <div
      className="m-4 px-5 pt-3 rounded-lg bg-darkblue-900"
      // data-aos="fade-up"
      // data-aos-offset="200"
      // data-aos-delay="50"
      // data-aos-duration="800"
      // data-aos-easing="ease-in-out"
      // data-aos-mirror="true"
      // data-aos-once="true"
      // data-aos-anchor-placement="top-bottom"
    >
      <header
        className=""
        // data-aos="fade-in"
        // data-aos-offset="200"
        // data-aos-delay="50"
        // data-aos-duration="1200"
        // data-aos-easing="ease-in-out"
        // data-aos-mirror="true"
        // data-aos-once="true"
        // data-aos-anchor-placement="top-bottom"
      >
        <div className="flex justify-between h-6">
          <p className="font-semibold text-darkblue-200">{title}</p>
          <SaveToReadingListIcon callback={saveToReadingList} />
        </div>
        <div className="flex text-darkblue-500 text-xs">
          <span className="flex mr-2">
            <p>posted on: {date}</p>
          </span>
          <p className="">
            <FontAwesomeIcon className="mr-2" icon={faEye} size="1x" />
            {`${views} total views`}
          </p>
        </div>
      </header>

      <div
        className="flex"
        // data-aos="fade-in"
        // data-aos-offset="250"
        // data-aos-delay="50"
        // data-aos-duration="1200"
        // data-aos-easing="ease-in-out"
        // data-aos-mirror="true"
        // data-aos-once="true"
        // data-aos-anchor-placement="top-bottom"
      >
        <p className="pl-8 py-4 text-darkblue-400 text-sm">{description}</p>
        <div className="mx-4 self-center">{getVoteIcons()}</div>
      </div>

      <footer className="flex justify-between border-t border-darkblue-700 py-3">
        <div className="relative rounded-full bg-gray-200 top-1">
          <Tag {...tag} />
        </div>
        <div className="">
          <div className="relative inline-block top-2 right-2">
            <FontAwesomeIcon
              icon={faCommentAlt}
              size="2x"
              className="text-darkblue-300 cursor-pointer hover:text-darkblue-700 hover-transition"
            />
            <span className="relative bottom-2 right-5 z-10 hover-transition select-none font-semibold">
              {comments.length}
            </span>
          </div>
          <button
            className="hover-transition text-darkblue-900 p-2 rounded bg-darkblue-300 hover:bg-darkblue-700 hover:text-darkblue-300"
            onClick={() => (window.location = url)}
          >
            READ MORE
          </button>
        </div>
      </footer>
    </div>
  );
};

export default PostItem;
