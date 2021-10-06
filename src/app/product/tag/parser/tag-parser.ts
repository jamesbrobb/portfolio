import {TagDTO} from '../tag.dto';
import {TagDS} from '../tag.ds';



export class TagParser {

    private static _familyLabels: {[key: string]: string} = {};

    public static setFamilyLabels(arg: {[key: string]: string}): void {
        this._familyLabels = arg;
    }

    public static fromDTOToDS(dto: TagDTO): TagDS {

        const familyLabel: string = this._familyLabels && this._familyLabels[dto.family] ? this._familyLabels[dto.family] : dto.family;

        return {
            id: dto.id,
            label: dto.label,
            family: dto.family,
            familyLabel: familyLabel
        };
    }

    public static fromDTOArrayToDSArray(dto: TagDTO[]): TagDS[] {
        const result = dto.map((item: TagDTO) => this.fromDTOToDS(item));
        return result;
    }
}
