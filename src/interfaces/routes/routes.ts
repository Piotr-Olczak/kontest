import { RouteComponentProps, RouteProps } from 'react-router-dom';

export interface PrivateRouteProps extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}
