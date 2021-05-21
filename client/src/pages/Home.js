import React from "react";
import { useQuery } from "@apollo/client";
import { Grid } from "semantic-ui-react";

import PostCard from "../components/PostCard";
import { FETCH_POSTS_QUERY } from "../utils/graphql";
import styles from "./home.module.css";

function Home() {
  const { loading, data: { getPosts: posts } = {} } =
    useQuery(FETCH_POSTS_QUERY);

  // if (posts) console.log(posts);

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          posts &&
          posts.map((post) => (
            <Grid.Column key={post.id} className={styles.cardGrid}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
