import React from "react"
import ContentLoader from "react-content-loader"

const Loader = () => (
  <ContentLoader
    speed={2}
    width={170}
    height={200}
    viewBox="0 0 150 190"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="408" rx="10" ry="10" width="90" height="27" />
    <rect x="127" y="400" rx="20" ry="20" width="152" height="44" />
    <rect x="291" y="104" rx="10" ry="10" width="150" height="72" />
    <rect x="0" y="105" rx="5" ry="5" width="150" height="15" />
    <rect x="0" y="160" rx="5" ry="5" width="80" height="25" />
    <rect x="115" y="155" rx="5" ry="5" width="32" height="32" />
    <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
    <rect x="0" y="125" rx="5" ry="5" width="90" height="15" />
  </ContentLoader>
)

export default Loader