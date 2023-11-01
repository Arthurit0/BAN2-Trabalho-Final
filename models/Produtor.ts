import _ from 'lodash';

export default class Produtor {
    private _cdProd: number;
    private _cdEnd: number;
    private _dnmProdutor: string;
    private _nmEmpresa?: string;

    constructor(cdProd: number, cdEnd: number, dnmProdutor: string, nmEmpresa?: string) {
        this._cdProd = cdProd;
        this._cdEnd = cdEnd;
        this._dnmProdutor = dnmProdutor;
        this._nmEmpresa = nmEmpresa;
    }

    public get cdProd(): number {
        return this._cdProd;
    }

    public get cdEnd(): number {
        return this._cdEnd;
    }

    public set cdEnd(cdEnd: number) {
        this._cdEnd = cdEnd;
    }

    public get dnmProdutor(): string {
        return this._dnmProdutor;
    }

    public set dnmProdutor(dnmProdutor: string) {
        this._dnmProdutor = dnmProdutor;
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
