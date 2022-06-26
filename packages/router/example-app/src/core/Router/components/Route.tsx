import {
  Route as ReactRoute,
  RouteProps as ReactRouteProps,
} from "react-router-dom";

interface RouteProps {
  route: Route;
}

export const Route = (props: RouteProps) => {
  const { route } = props;

  //
  //
  //
  return <ReactRoute {...routeProps} />;
};
