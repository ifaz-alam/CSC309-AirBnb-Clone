import React, { useEffect, useState } from "react";

// import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// import css
import "./style.css";

const Comment = (props) => {
  const {
    author,
    author_username,
    comment,
    parent,
    pk,
    rating,
    replies,
    deleteComment,
    created_at,
  } = props;

  const date = new Date(created_at);
  const [commentReplies, setCommentReplies] = useState(replies);

  const [commentState, setcommentState] = useState(comment);
  const [editedcommentState, seteditedcommentState] = useState(comment);

  const [replyToggle, setReplyToggle] = useState(false);
  const [reply, setReply] = useState("");
  const [replyErrorText, setReplyErrorText] = useState("");

  const [authorAccount, setAuthorAccount] = useState();

  const [editToggle, setEditToggle] = useState(false);
  const [valid, setValid] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  let APIURL = "http://localhost:8000";

  const permission = author_username === localStorage.getItem("username");

  useEffect(() => {
    fetch(`http://localhost:8000/accounts/user/?pk=${author}&all=false/`)
      .then((response) => response.json())
      .then((result) => {
        setAuthorAccount(result);
      });
  }, []);

  const getStars = (rating) => {
    if (parent?.comment !== undefined) {
      return <> </>;
    }

    if (rating === 0) {
      return (
        <>
          <span className="fa fa-star"></span>{" "}
          <span className="fa fa-star"></span>{" "}
          <span className="fa fa-star"></span>{" "}
          <span className="fa fa-star"></span>{" "}
          <span className="fa fa-star"></span>
        </>
      );
    } else if (rating === 1) {
      return (
        <>
          <span className="fa fa-star checked"></span>{" "}
          <span className="fa fa-star"></span>{" "}
          <span className="fa fa-star"></span>{" "}
          <span className="fa fa-star"></span>{" "}
          <span className="fa fa-star"></span>
        </>
      );
    } else if (rating === 2) {
      return (
        <>
          <span className="fa fa-star checked"></span>{" "}
          <span className="fa fa-star checked"></span>{" "}
          <span className="fa fa-star"></span>{" "}
          <span className="fa fa-star"></span>{" "}
          <span className="fa fa-star"></span>
        </>
      );
    } else if (rating === 3) {
      return (
        <>
          <span className="fa fa-star checked"></span>{" "}
          <span className="fa fa-star checked"></span>{" "}
          <span className="fa fa-star checked"></span>{" "}
          <span className="fa fa-star"></span>{" "}
          <span className="fa fa-star"></span>
        </>
      );
    } else if (rating === 4) {
      return (
        <>
          <span className="fa fa-star checked"></span>{" "}
          <span className="fa fa-star checked"></span>{" "}
          <span className="fa fa-star checked"></span>{" "}
          <span className="fa fa-star checked"></span>{" "}
          <span className="fa fa-star"></span>
        </>
      );
    } else if (rating === 5) {
      return (
        <>
          <span className="fa fa-star checked"></span>{" "}
          <span className="fa fa-star checked"></span>{" "}
          <span className="fa fa-star checked"></span>{" "}
          <span className="fa fa-star checked"></span>{" "}
          <span className="fa fa-star checked"></span>
        </>
      );
    }
  };

  const replyToComment = async () => {
    console.log("reply to comment");
    console.log(reply);

    let APIURL = "http://localhost:8000";
    let request = await fetch(`${APIURL}/comments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("Authorization")}`,
      },
      body: JSON.stringify({
        comment: reply,
        rating: 0,
        content_obj_pk: pk,
        content_obj_type: "Comment",
      }),
    });

    let response = await request.json();
    if (request.status !== 200) {
      setReplyErrorText("You cannot reply to this comment.");
    } else {
      setReplyErrorText("");
      setReplyToggle(false);
      setReply("");
      console.log(commentReplies);
      setCommentReplies([...commentReplies, response]);
    }
  };

  const updateComment = async () => {
    let response = await fetch(`${APIURL}/comments/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("Authorization")}`,
      },
      body: JSON.stringify({
        pk: pk,
        comment: editedcommentState,
        rating: rating || 0,
      }),
    });
    let result = await response.json();
    if (response.status !== 200) {
      setErrorMsg("You cannot edit this comment.");
    }
    if (response.status === 200) {
      setErrorMsg("");
      setEditToggle(false);
      setcommentState(editedcommentState);
    }
  };

  return (
    <>
      <div className="card comment container mb-3">
        <div className="card-header row">
          <div className="col-lg-1 d-flex justify-content-center">
            <img
              className="profile-pic"
              src={
                authorAccount?.profile_picture
                  ? `${APIURL}${authorAccount.profile_picture.image}`
                  : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pphfoundation.ca%2Fwp-content%2Fuploads%2F2018%2F05%2Fdefault-avatar.png&f=1&nofb=1&ipt=585d0ba94f18f55d1a9f4950f1a2a870987a0a5692553104b6c33600b7a884e6&ipo=images"
              }
              alt="profile-pic"
            />
          </div>
          <div className="col d-flex justify-content-between align-items-center">
            <div>
              <h6 className="card-title d-inline me-3">{author_username}</h6>
              <div className="">{getStars(rating)}</div>
              <div>{date.toLocaleDateString()}</div>
            </div>

            <div className="buttons d-flex justify-content-evenly">
              <div className="delete-button mx-1">
                {permission ? (
                  <>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteComment(pk)}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="reply-button">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setReplyToggle(true)}
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          {editToggle ? (
            <div>
              <div className="my-1 d-flex flex-column">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => seteditedcommentState(e.target.value)}
                    value={editedcommentState}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={(e) => {
                      updateComment(e);
                    }}
                  >
                    Submit
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => {
                      setEditToggle(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
                {valid ? <></> : <div className="text-danger">{errorMsg}</div>}
              </div>
            </div>
          ) : (
            <p
              onClick={() => {
                permission && setEditToggle(true);
              }}
            >
              {commentState}
            </p>
          )}
        </div>
        <div>
          {replyToggle ? (
            <>
              <div className="d-flex flex-column">
                <input
                  type="text"
                  name="reply"
                  id="reply"
                  value={reply}
                  className="form-control"
                  onChange={(e) => setReply(e.target.value)}
                />
                {replyErrorText ? (
                  <p className="text-danger">{replyErrorText}</p>
                ) : (
                  <></>
                )}
                <button
                  className="btn btn-primary my-2"
                  onClick={() => replyToComment()}
                >
                  {" "}
                  Submit
                </button>
                <button
                  className="btn btn-danger my-2"
                  onClick={() => {
                    setReplyToggle(false);
                    setReplyErrorText("");
                  }}
                >
                  {" "}
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div>
          {commentReplies?.map((reply) => (
            <Comment key={reply.pk} {...reply} deleteComment={deleteComment} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Comment;
