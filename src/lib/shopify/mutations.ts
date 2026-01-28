// Cart GraphQL Fragment for mutations
export const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
    }
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          cost {
            subtotalAmount { amount currencyCode }
            totalAmount { amount currencyCode }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              availableForSale
              price { amount currencyCode }
              selectedOptions { name value }
              product {
                id
                title
                handle
                featuredImage { url altText width height }
              }
              image { url altText }
            }
          }
          attributes { key value }
        }
      }
    }
    buyerIdentity {
      email
      countryCode
    }
    attributes { key value }
  }
`;

// Create a new cart
export const CART_CREATE_MUTATION = `
  mutation CartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart {
        ...CartFields
      }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`;

// Add items to a cart
export const CART_LINES_ADD_MUTATION = `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`;

// Update the quantity of items in a cart
export const CART_LINES_UPDATE_MUTATION = `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`;

// Remove items from a cart
export const CART_LINES_REMOVE_MUTATION = `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartFields
      }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`;
