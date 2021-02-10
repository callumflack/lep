/* eslint-disable react/prop-types */
import * as React from "react";
// import PropTypes from "prop-types";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
// import { GetStaticProps, NextPage } from "next";
import { renderMetaTags } from "react-datocms";
import { getAllReportsBySlug, getPostAndMorePosts } from "@/lib/api";
import {
  Container,
  SimpleGrid,
  Box,
  Flex,
  Text,
  Button,
  VStack,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import LayoutBase from "@/components/LayoutBase";
import GridArticle from "@/components/GridArticle";
// import MediaImage from "@/components/MediaImage";

export default function Post({ post, preview }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <LayoutBase preview={preview}>
      <Head>{post && renderMetaTags(post.seo)}</Head>

      <GridArticle>
        <Text textStyle="textXl">Reports</Text>
      </GridArticle>

      {router.isFallback ? (
        <Text>Loading…</Text>
      ) : (
        <GridArticle>
          <Text textStyle="text5xl">{post.title}</Text>
          <Text>This like the published date will also go here…</Text>
          <Text>{post.heroLede}</Text>
          {/* <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              /> */}
          {/* <PostBody content={post.content} /> */}
        </GridArticle>
      )}

      {post?.content?.map((item) => (
        <GridArticle
          key={item.id}
          aside={<Text textStyle="article">{item.footnote}</Text>}
        >
          <VStack align="flex-start" spacing={2} textStyle="article">
            <ReactMarkdown key={item.id}>{item.text}</ReactMarkdown>
          </VStack>
        </GridArticle>
      ))}

      <GridArticle>
        <Container layerStyle="spaceXlY">
          {/* {morePosts.length > 0 && <Text>there are more posts…</Text>} */}
        </Container>
      </GridArticle>
    </LayoutBase>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getPostAndMorePosts(params.slug, preview);

  return {
    props: {
      preview,
      post: {
        ...data?.report,
      },
      morePosts: data?.morePosts ?? [],
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllReportsBySlug();
  return {
    paths: allPosts?.map((post) => `/reports/${post.slug}`) || [],
    fallback: true,
  };
}