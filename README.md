# ExpandingResultActionsMenu

A companion component that adds expanding capabilities to the ResultActionsMenu component. This component is used to control whether the hovering ResultActionsMenu is always visible and if so, which components are hidden until the user hovers over the result.

Disclaimer: This component was built by the community at large and is not an official Coveo JSUI Component. Use this component at your own risk.

## Getting Started

1. Install the component into your project.

```
npm i @coveops/expanding-result-actions-menu
```

2. Use the Component or extend it

Typescript:

```javascript
import { ExpandingResultActionsMenu, IExpandingResultActionsMenuOptions } from '@coveops/expanding-result-actions-menu';
```

Javascript

```javascript
const ExpandingResultActionsMenu = require('@coveops/expanding-result-actions-menu').ExpandingResultActionsMenu;
```

3. You can also expose the component alongside other components being built in your project.

```javascript
export * from '@coveops/expanding-result-actions-menu'
```

4. Or for quick testing, you can add the script from unpkg

```html
<script src="https://unpkg.com/@coveops/expanding-result-actions-menu@latest/dist/index.min.js"></script>
```

> Disclaimer: Unpkg should be used for testing but not for production.

5. Include the component in your template as follows:

Place the component in your markup under the `CoveoResultActionsMenu` class:

```html
<div class="CoveoExpandingResultActionsMenu"></div>
```

Such that:

```html
<div class="CoveoResultActionsMenu">
    <div class="CoveoExpandingResultActionsMenu" data-always-show="true" data-menu-items-require-hover="CopyToClipboard"></div>
    <div class="CoveoCopyToClipboard"></div>
    <div class="CoveoSalesforceQuickview"></div>
</div>
```

### Options

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| alwaysShow | boolean | false | Show the ResultActionsMenu regardless of which result the user is hovering in |
| menuItemsRequireHover | string[] | [] | A list of Coveo components within the ResultActionsMenu that should remain hidden until the user is hovering on a result. |

See `pages/index.html`

## Extending

Extending the component can be done as follows:

```javascript
import { ExpandingResultActionsMenu, IExpandingResultActionsMenuOptions } from "@coveops/expanding-result-actions-menu";

export interface IExtendedExpandingResultActionsMenuOptions extends IExpandingResultActionsMenuOptions {}

export class ExtendedExpandingResultActionsMenu extends ExpandingResultActionsMenu {}
```

## Contribute

1. Clone the project
2. Copy `.env.dist` to `.env` and update the COVEO_ORG_ID and COVEO_TOKEN fields in the `.env` file to use your Coveo credentials and SERVER_PORT to configure the port of the sandbox - it will use 8080 by default.
3. Build the code base: `npm run build`
4. Serve the sandbox for live development `npm run serve`