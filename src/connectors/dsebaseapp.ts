import axios from 'axios';
import * as vscode from 'vscode';
import { Registry, RegistryResultItem } from "../registry";

export class DseBaseApp extends Registry {

    private endpoint:string;

    get name() {
        return 'dsebaseapp';
    }

    constructor(config:any) {
        super(config);
        this.endpoint = "http://127.0.1.1:8080/exist/apps/schnitzler-briefe/ac/entity-ac.xql?query=";
    }

    async query(key:string) {
        const results:RegistryResultItem[] = [];
        
        const response = await axios.get(`${this.endpoint}${key}`);
        if (response.status !== 200) {
            vscode.window.showInformationMessage(
                "ERROR"
            );
            return {
                totalItems: 0,
                items: []
            };
        }
        const json:any = response.data.item;   
        json.forEach((item:any) => {
            if (item.id !== "false") {
                const result:RegistryResultItem = {
                    register: this._register,
                    id: item.id,
                    label: item.name,
                    details: item.description,
                    link: `https://www.geonames.org/ider`
                };
                results.push(result);
            }
        });
        return {
            totalItems: results.length,
            items: results
        };
    }
}