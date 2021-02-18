import { Component, IComponentBindings, ComponentOptions, ResultActionsMenu, $$ } from 'coveo-search-ui';
import { lazyDependentComponent } from '@coveops/turbo-core';

export interface IExpandingResultActionsMenuOptions {
    alwaysShow: boolean;
    menuItemsRequireHover: string[];
}

@lazyDependentComponent('ResultActionsMenu')
export class ExpandingResultActionsMenu extends Component {
    static ID = 'ExpandingResultActionsMenu';
    static options: IExpandingResultActionsMenuOptions = {
        alwaysShow: ComponentOptions.buildBooleanOption({
            defaultValue: false,
        }),
        menuItemsRequireHover: ComponentOptions.buildListOption({
            defaultValue: [],
        })
    };

    private resultActionsMenu: ResultActionsMenu;

    constructor(public element: HTMLElement, public options: IExpandingResultActionsMenuOptions, public bindings: IComponentBindings) {
        super(element, ExpandingResultActionsMenu.ID, bindings);
        this.options = ComponentOptions.initComponentOptions(element, ExpandingResultActionsMenu, options);
        this.element.hidden = true;
        this.resultActionsMenu = <ResultActionsMenu>Coveo.get(this.element.parentElement);

        this.build()
    }

    protected build() {
        const { alwaysShow } = this.options;

        if (alwaysShow) {
            this.setupAlwaysShow();
        }

        this.setupHoverItems();
    }

    protected setupAlwaysShow() {
        this.resultActionsMenu.show();
        $$(this.resultActionsMenu.element).addClass("coveo-user-actions-always-show");
        $$(this.resultActionsMenu.parentResult).on('mouseleave', () => this.resultActionsMenu.show());
    }

    protected setupHoverItems() {
        $$(this.resultActionsMenu.element).addClass("coveo-user-actions-collapsed");
        this.resultActionsMenu.menuItems.forEach(action => this.setupHoverItem(action))
    }

    protected setupHoverItem(action: HTMLElement) {
        let [componentClassName] = $$(action).getClass();
        componentClassName = componentClassName.replace('Coveo', '');

        if (ExpandingResultActionsMenu.ID === componentClassName) {
            return;
        }

        if (this.componentRequiresHover(componentClassName)) {
            $$(action).hide();
            $$(this.resultActionsMenu.parentResult).on('mouseenter', () => this.handleMouseEnter(action));
            $$(this.resultActionsMenu.parentResult).on('mouseleave', () => this.handleMouseLeave(action));
        }
    }

    protected componentRequiresHover(componentName: string) {
        const { menuItemsRequireHover = [] } = this.options;

        return menuItemsRequireHover.includes(componentName) || menuItemsRequireHover.includes(`Coveo${componentName}`);
    }

    protected handleMouseEnter(action: HTMLElement) {
        $$(this.resultActionsMenu.element).removeClass("coveo-user-actions-collapsed");
        $$(action).show();
    }

    protected handleMouseLeave(action: HTMLElement) {
        $$(this.resultActionsMenu.element).addClass("coveo-user-actions-collapsed");
        $$(action).hide();
    }
}