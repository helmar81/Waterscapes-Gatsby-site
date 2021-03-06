import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import CardList from '../components/CardList'
import Card from '../components/Card'
import Helmet from 'react-helmet'
import Container from '../components/Container'
import Pagination from '../components/Pagination'
import SEO from '../components/SEO'
import config from '../utils/siteConfig'
import HomePageHero from '../components/HomePageHero'

const Index = ({ data, pageContext }) => {
  const posts = data.allContentfulWaterpoint.edges
  const featuredPost = posts[0].node
  const { currentPage } = pageContext
  const isFirstPage = currentPage === 1

  return <Layout>
      <SEO />
      {!isFirstPage && <Helmet>
          <title>{`${config.siteTitle} - Page ${currentPage}`}</title>
        </Helmet>}

      <Container>
        <HomePageHero />
        {/*{isFirstPage ? (
          <CardList>
            <Card {...featuredPost} featured />
            {posts.slice(1).map(({ node: post }) => (
              <Card key={post.id} {...post} />
            ))}
          </CardList>
        ) : (*/}
        <CardList>
          {posts.map(({ node: post }) => <Card key={post.id} {...post} />)}
        </CardList>
        {/*)}*/}
      </Container>
      <Pagination context={pageContext} />
    </Layout>
}

export const query = graphql`
         query($skip: Int!, $limit: Int!) {
           allContentfulWaterpoint(sort: { fields: [publishDate], order: DESC }, limit: $limit, skip: $skip) {
             edges {
               node {
                 title
                 id
                 slug
                 area
                 country
                 publishDate(formatString: "MMMM DD, YYYY")
                 heroImage {
                   fluid(maxWidth: 400) {
                     ...GatsbyContentfulFluid_tracedSVG
                   }
                 }
                 body {
                   childMarkdownRemark {
                     html
                     excerpt(pruneLength: 80)
                   }
                 }
               }
             }
           }
         }
       `

export default Index

// heroImage {
//   title
//   fluid(maxWidth: 1800) {
//               ...GatsbyContentfulFluid_withWebp_noBase64
//   }
// }