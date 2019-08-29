export class Projet {
    nom: string ;
    client: string ;
    dateCreation: Date ;

    constructor(nom: string, client: string, date: Date) {
        this.nom = nom ;
        this.client = client ;
        this.dateCreation = date ;
    }
}
