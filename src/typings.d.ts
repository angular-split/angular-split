/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
    id: string;
}


interface IExampleData {
    path: string
    component: any
    label: string
    srcUrl: string
}