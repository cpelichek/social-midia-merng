import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { useForm } from "../utils/hooks";
import { CREATE_POST_MUTATION, FETCH_POSTS_QUERY } from "../utils/graphql";
import styles from "./postform.module.scss";

function PostForm() {
  const { userValues, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: userValues,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      userValues.body = "";
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Speak your mind!"
            name="body"
            onChange={onChange}
            value={userValues.body}
            error={error ? true : false}
          />
          <Button
            className={styles.submitBtn} // solution 1 // TODO:figure out how to override Semantic UI rules... I'm trying to use cursor: not-allowed with this class added to the specifity of the Semantic UI style but it isn't working
            type="submit"
            color="teal"
            disabled={userValues.body ? "" : "disabled"} //solution 1
            // style={userValues.body ? {} : { display: "none" }} // solution 2
          >
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
}

export default PostForm;
