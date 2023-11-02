import { useState, useEffect } from "react";
import { commentPostedTime } from "./CommentSection/utils";
import IconDelete from "./CommentSection/icons/icon-delete.jsx";
import IconEdit from "./CommentSection/icons/icon-edit.jsx";
import "./CommentSection/styles/CommentSection.scss"
import "./CommentSection/styles/AddComment.scss";
import "./CommentSection/styles/Comment.scss";
import "./CommentSection/styles/DeleteModal.scss";
import "./CommentSection/styles/index.scss";
import "./CommentSection/styles/variables.scss";

const AddComment = ({ buttonValue, addComments, username }) => {
  const [comment, setComment] = useState("");

  const clickHandler = () => {
    if (comment === "" || comment === " ") return;

    const newComment = {
      id: Math.floor(Math.random() * 100) + 5,
      content: comment,
      createdAt: new Date(),
      username: username,
      currentUser: true,
    };

    addComments(newComment);
    setComment("");
  };

  return (
    <div className="add-comment">
      <div className="profile-pic"></div>
      <textarea
        className="comment-input"
        placeholder="Add a comment"
        value={comment}
        onChange={(e) => {
          setComment(
            e.target.value.replace("", "")
          );
        }}
      />
      <div className="send-btn-container">
        <div className="profile-pic"></div>
        <button className="add-btn" onClick={clickHandler}>
          {buttonValue}
        </button>
      </div>
    </div>
  );
};

const Comment = ({
  commentData,
  editComment,
  commentDelete,
  setDeleteModalState,
}) => {
  const [time, setTime] = useState("");
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(commentData.content);
  const [deleting, setDeleting] = useState(false);

  // get time from comment posted
  const createdAt = new Date(commentData.createdAt);
  const today = new Date();
  const differenceInTime = today.getTime() - createdAt.getTime();

  useEffect(() => {
    setTime(commentPostedTime(differenceInTime));
  }, [differenceInTime]);

  const updateComment = () => {
    editComment(content, commentData.id, "comment");
    setEditing(false);
  };

  const deleteComment = (id, type) => {
    const finalType = type !== undefined ? type : "comment";
    const finalId = id !== undefined ? id : commentData.id;
    commentDelete(finalId, finalType, commentData.id);
    setDeleting(false);
  };

  return (
    <div
      className={`comment-container`}
    >
      <div className="comment">
        <div className="comment--body">
          <CommentHeader
            commentData={commentData}
            setDeleting={setDeleting}
            setDeleteModalState={setDeleteModalState}
            setEditing={setEditing}
            time={time}
          />
          {!editing ? (
            <div className="comment-content">{commentData.content}</div>
          ) : (
            <textarea
              className="content-edit-box"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          )}
          {editing && (
            <button className="update-btn" onClick={updateComment}>
              Update
            </button>
          )}
        </div>
        <CommentFooter
          commentData={commentData}
          setDeleting={setDeleting}
          setDeleteModalState={setDeleteModalState}
          setEditing={setEditing}
        />
      </div>
      {deleting && (
        <DeleteModal
          setDeleting={setDeleting}
          deleteComment={deleteComment}
          setDeleteModalState={setDeleteModalState}
        />
      )}
    </div>
  );
};

const CommentBtn = ({ commentData, setDeleting, setDeleteModalState, setEditing }) => {
  // delete comment
  const showDeleteModal = () => {
    setDeleting(true);
    setDeleteModalState(true);
  };

  // edit comment
  const showEditComment = () => {
    setEditing(true);
  };

  return (
    <div className="comment--btn">
      <button
        className={`delete-btn ${commentData.currentUser ? "" : "display--none"
          }`}
        onClick={showDeleteModal}
      >
        <IconDelete /> Delete
      </button>
      <button
        className={`edit-btn ${commentData.currentUser ? "" : "display--none"}`}
        onClick={showEditComment}
      >
        <IconEdit /> Edit
      </button>
    </div>
  );
};

const CommentFooter = ({
  commentData,
  setDeleting,
  setDeleteModalState,
  setEditing,
}) => {
  return (
    <div className="comment--footer">

      <CommentBtn
        commentData={commentData}
        setDeleting={setDeleting}
        setDeleteModalState={setDeleteModalState}
        setEditing={setEditing}
      />
    </div>
  );
};

const CommentHeader = ({ commentData, setDeleting, setDeleteModalState, setEditing, time }) => {
  return (
    <div className="comment--header">
      <div className={`profile-pic ${commentData.username}`}></div>
      <div className="username">{commentData.username}</div>
      {commentData.currentUser ? <div className="you-tag">you</div> : ""}
      <div className="comment-posted-time">{`${time} ago`}</div>
      <CommentBtn
        commentData={commentData}
        setDeleting={setDeleting}
        setDeleteModalState={setDeleteModalState}
        setEditing={setEditing}
      />
    </div>
  );
};

const DeleteModal = ({ setDeleting, deleteComment, setDeleteModalState }) => {
  const cancelDelete = () => {
    setDeleting(false);
    setDeleteModalState(false);
  };

  const deleteBtnClick = () => {
    deleteComment();
    setDeleteModalState(false);
  };

  return (
    <div className="delete-confirmation-wrapper">
      <div className="delete-container">
        <div className="title">Delete comment</div>
        <div className="confirmation-message">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </div>
        <div className="btn-container">
          <button className="cancel-btn" onClick={cancelDelete}>
            No, cancel
          </button>
          <button className="delete-btn" onClick={deleteBtnClick}>
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
};

const CommentSection = () => {
  const [comments, updateComments] = useState([]);
  const [deleteModalState, setDeleteModalState] = useState(false);

  const getData = async () => {
    try {
      const url = "./data.json";
      console.log("Fetching data from URL: ", url);
  
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to fetch data.json - HTTP status ${res.status}`);
      }
      
      const data = await res.json();
      console.log("Fetched data:", data);
  
      updateComments(data.comments);
    } catch (error) {
      console.error(error);
      // Handle the error (e.g., show an error message to the user)
    }
  };
    
  useEffect(() => {
    localStorage.getItem("comments") !== null
      ? updateComments(JSON.parse(localStorage.getItem("comments")))
      : getData();
  }, []);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
    deleteModalState
      ? document.body.classList.add("overflow--hidden")
      : document.body.classList.remove("overflow--hidden");
  }, [comments, deleteModalState]);

  // add comments
  let addComments = (newComment) => {
    let updatedComments = [...comments, newComment];
    updateComments(updatedComments);
  };

  // edit comment
  let editComment = (content, id, type) => {
    let updatedComments = [...comments];

    if (type === "comment") {
      updatedComments.forEach((data) => {
        if (data.id === id) {
          data.content = content;
        }
      });
    }

    updateComments(updatedComments);
  };

  // delete comment
  let commentDelete = (id, type) => {
    let updatedComments = [...comments];

    if (type === "comment") {
      updatedComments = updatedComments.filter((data) => data.id !== id);
    }

    updateComments(updatedComments);
  };

  return (
    <main className="CommentSection">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          commentData={comment}
          editComment={editComment}
          commentDelete={commentDelete}
          setDeleteModalState={setDeleteModalState}
        />
      ))}
      <AddComment username={"Hau"} buttonValue={"send"} addComments={addComments} />
    </main>
  );
};

export default CommentSection;