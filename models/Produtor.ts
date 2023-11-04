import _ from 'lodash';

export default class Produtor {
    private _cdProd!: number;
    private _cdEnd!: number;
    private _nmProdutor!: string;
    private _nmEmpresa?: string;

    // constructor(cdProd: number, cdEnd: number, nmProdutor: string, nmEmpresa?: string) {
    //     this._cdProd = cdProd;
    //     this._cdEnd = cdEnd;
    //     this._nmProdutor = nmProdutor;
    //     this._nmEmpresa = nmEmpresa;
    // }

    public get cdProd(): number {
        return this._cdProd;
    }

    public set cdProd(cdProd: number) {
        this._cdProd = cdProd;
    }

    public get cdEnd(): number {
        return this._cdEnd;
    }

    public set cdEnd(cdEnd: number) {
        this._cdEnd = cdEnd;
    }

    public get nmProdutor(): string {
        return this._nmProdutor;
    }

    public set nmProdutor(nmProdutor: string) {
        this._nmProdutor = nmProdutor;
    }

    public get nmEmpresa(): string | undefined {
        return this._nmEmpresa;
    }

    public set nmEmpresa(nmEmpresa: string) {
        this._nmEmpresa = nmEmpresa;
    }

    public equal(obj: Produtor) {
        return _.isEqual(obj, this);
    }
}
