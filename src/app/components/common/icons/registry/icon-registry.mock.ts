import {IconsConfig} from '../icons.config';


export class IconRegistryMock {

    get availableIconNameList(): string[] { return []; }

    public registerIcons(icons: IconsConfig): void {

    }

    public isIconRegistered(iconName: string): boolean {
        return;
    }

    public getIconSvgByName(name: string): any {
        return;
    }
}
