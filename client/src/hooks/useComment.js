import { useState, useEffect } from "react";
import commentService from "services/comment-service";

function useComment(commentId) {
  const [comment, setComment] = useState({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    commentService
      .getById(commentId)
      .then(({ data }) => setComment(data))
      .catch((errors) => setErrors(errors))
      .finally(() => setLoading(false));
  }, []);
  return { comment, loading, errors, setComment };
}

export default useComment;
