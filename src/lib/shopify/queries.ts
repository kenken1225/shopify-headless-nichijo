// ProductsPage Query
export const PRODUCTS_LIST_QUERY = `
  query ProductsList {
    products(first: 12) {
      edges {
        node {
          handle
          title
          featuredImage {
            url
            altText
            width
            height
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      title
      description
      handle
      featuredImage {
        url
        altText
        width
        height
      }
      images(first: 8) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
      variants(first: 4) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;
