import * as dtoMock from '../lesson-plan.dto.mock.json';
import * as dsMock from '../lesson-plan.ds.mock.json';

import { LessonPlanParser } from './lesson-plan-parser';
import {ASSET_TYPE, AssetService} from '../../asset';



describe('LessonPlanParser', () => {

    let parser, mock;

    const assetService = {
        getUrl: (type: ASSET_TYPE, path: string) => path,
        getUrlFromId: (type: ASSET_TYPE, id: string) => `/media/image/${id}`
    } as AssetService;

    beforeEach(() => {
        parser = new LessonPlanParser(assetService);
        mock = {
            dto: dtoMock,
            ds: dsMock,
            grid: undefined
        };
    });

    describe('fromDTOToDS (LessonPlanDTO): LessonPlanDS', () => {

        describe('GIVEN a LessonPlanDTO', () => {

            describe('complete', () => {

                it('returns a LessonPlanDS', () => {
                    expect(parser.fromDTOToDS(<any>mock.dto)).toEqual(mock.ds);
                });
            });

            describe('without course metadata', () => {

                beforeEach(() => {
                    mock.dto['metadata']['actions']['published']['course'] = undefined;
                    mock.ds.course = undefined;
                });

                it('returns a LessonPlanDS without course information', () => {
                    expect( parser.fromDTOToDS(<any>mock.dto) ).toEqual(mock.ds);
                });
            });

            describe('without unit metadata', () => {

                beforeEach(() => {
                    mock.dto['metadata']['actions']['published']['unit'] = undefined;
                    mock.ds.unit = undefined;
                });

                it('returns a LessonPlanDS without unit information', () => {
                    expect( parser.fromDTOToDS(<any>mock.dto) ).toEqual(mock.ds);
                });
            });

            describe('without thumbnailAssetId defined', () => {

                beforeEach(() => {
                    mock.dto['thumbnailAssetId'] = undefined;
                    mock.ds.thumbnailAssetPath = undefined;
                });

                it('returns a LessonPlanDS without thumbnailAssetPath information', () => {
                    expect( parser.fromDTOToDS(<any>mock.dto) ).toEqual(mock.ds);
                });
            });

            describe('without coveredRequirements defined', () => {

                beforeEach(() => {
                    mock.dto['BUAttributes']['CTX'] = undefined;
                    mock.ds.coveredRequirements = undefined;
                });

                it('returns a LessonPlanDS without coveredRequirements information', () => {
                    expect( parser.fromDTOToDS(<any>mock.dto) ).toEqual(mock.ds);
                });
            });

            describe('without skills defined', () => {

                beforeEach(() => {
                    mock.dto['skill'] = undefined;
                    mock.ds.skills = [] ;
                });

                it('returns a LessonPlanDS without skills information', () => {
                    expect( parser.fromDTOToDS(<any>mock.dto) ).toEqual(mock.ds);
                });
            });

            describe('without vocabulary defined', () => {

                beforeEach(() => {
                    mock.dto['vocabulary'] = undefined;
                    mock.ds.vocabulary = [] ;
                });

                it('returns a LessonPlanDS without vocabulary information', () => {
                    expect( parser.fromDTOToDS(<any>mock.dto) ).toEqual(mock.ds);
                });
            });

        });
    });

    describe('fromDTOArrayToDSArray (LessonPlanDTO[]): LessonPlanDS[]', () => {

        describe('GIVEN a LessonPlanDTO array', () => {

            it('returns an array of LessonPlanDS ', () => {
                expect(parser.fromDTOArrayToDSArray([mock.dto, mock.dto])).toEqual([mock.ds, mock.ds]);
            });
        });
    });
});
