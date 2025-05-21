/* eslint-disable no-unused-vars */
export enum PathType {
  Project = "project",
  Property = "property",
  Builder = "builder",
  Search = "search",
  SearchListing = "searchListing",
  PostProperty = "postProperty",
  Default = "default",
}

export const pathConfig = {
  project: {
    pathPrefix: "/abc/",
    redirectingPath: "/abc/banglore/nagawara/",
    paramName: "projId",
    pageType: PathType.Project,
    pageTitle: "Project Details Page",
  },
  property: {
    pathPrefix: "/listing/",
    redirectingPath: "/listing/whitefield/26f4c6a78ba0dca60edecf83a3b23f44",
    paramName: "propId",
    pageType: PathType.Property,
    pageTitle: "Property Details Page",
  },
  builder: {
    pathPrefix: "/builders/bengaluru/",
    redirectingPath: "/builders/bengaluru/",
    paramName: "builderId",
    pageType: PathType.Builder,
    pageTitle: "Builder Details Page",
  },
  search: {
    pathPrefix: "/search",
    redirectingPath: "/",
    paramName: "sp",
    pageType: PathType.Search,
    pageTitle: "Project Search Page",
  },
  searchListing: {
    pathPrefix: "/search/listing",
    redirectingPath: "/search/",
    paramName: "sl",
    pageType: PathType.SearchListing,
    pageTitle: "Property Search Page",
  },
  postProperty: {
    pathPrefix: "/search/property",
    redirectingPath: "/post-your-listing",
    paramName: "pp",
    pageType: PathType.PostProperty,
    pageTitle: "Post Property Page",
  },
  default: {
    pathPrefix: "/",
    redirectingPath: "/",
    paramName: "",
    pageType: PathType.Default,
    pageTitle: "Homepage",
  },
};
