import _ from 'lodash';

export default class Produtor {
    private _cdProdutor!: number;
    private _cdEndereco!: number;
    private _nmProdutor!: string;
    private _nmEmpresa?: string;

    // constructor(cdProd: number, cdEnd: number, nmProdutor: string, nmEmpresa?: string) {
    //     this._cdProd = cdProd;
    //     this._cdEnd = cdEnd;
    //     this._nmProdutor = nmProdutor;
    //     this._nmEmpresa = nmEmpresa;
    // }

    public get cdProdutor(): number {
        return this._cdProdutor;
    }

    public set cdProdutor(cdProd: number) {
        this._cdProdutor = cdProd;
    }

    public get cdEndereco(): number {
        return this._cdEndereco;
    }

    public set cdEndereco(cdEnd: number) {
        this._cdEndereco = cdEnd;
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

    public equals(obj: Produtor) {
        return _.isEqual(obj, this);
    }

    public static fromPostgresSql(res: any): Produtor {
        const produtor = new this();
        produtor._cdProdutor = res.cd_produtor;
        produtor._cdEndereco = res.cd_endereco;
        produtor._nmProdutor = res.nm_produtor;
        produtor._nmEmpresa = res.nm_empresa;
        return produtor;
    }
}
