import * as React from "react";

import { IContextApiProps } from "./IContextApiProps";
import Maincomponent from "./Maincomponent";
import { sp } from "@pnp/sp/presets/all";

export default class ContextApi extends React.Component<IContextApiProps, {}> {
  constructor(prop: IContextApiProps) {
    super(prop);
    sp.setup({
      spfxContext: this.props.context,
    });
  }
  public render(): React.ReactElement<IContextApiProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
    } = this.props;

    return <Maincomponent context={this.props.context} />;
  }
}
// import * as React from "react";
// import { IContextApiProps } from "./IContextApiProps";
// import Maincomponent from "./Maincomponent";
// import { sp } from "@pnp/sp/presets/all";

// const ContextApi: React.FC<IContextApiProps> = (props) => {
//   const {
//     description,
//     isDarkTheme,
//     environmentMessage,
//     hasTeamsContext,
//     userDisplayName,
//     context,
//   } = props;

//   React.useEffect(() => {
//     sp.setup({
//       spfxContext: context,
//     });
//   }, [context]);

//   return <Maincomponent context={context} />;
// };

// export default ContextApi;

