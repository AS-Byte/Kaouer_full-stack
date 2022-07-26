import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';
import { saveAs } from 'file-saver';
import { formatDate } from '@angular/common';
import { Subscription } from 'rxjs';
import { Championnat } from 'src/app/_models/championnat';
import { ChampionnatService } from 'src/app/_services/championnat.service';
import { ArbitreService } from 'src/app/_services/arbitre.service';

declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

@Component({
    selector: 'app-championnat',
    templateUrl: './championnat.component.html',
    styleUrls: ['./championnat.component.scss'],
    providers: [ConfirmationService, MessageService],
})
export class ChampionnatComponent implements OnInit {
    public championnats: Championnat[] = [];
    public championnat: Championnat = new Championnat();
    public updateDialog: boolean = false;
    userlist = [];
    selecteduser = [];
    submitted: boolean | undefined;
    data: any;

    chartOptions: any;

    subscription: Subscription = new Subscription();

    //config: AppConfig;
    constructor(
        private championnatService: ChampionnatService,
        private confirmationService: ConfirmationService,
        private ArbitreService: ArbitreService
    ) {}
    exportColumns!: any[];

    cols!: any[];
    colss!: any[];
    ngOnInit(): void {
        this.loadData();
        this.cols = [
            { field: 'nom', header: 'Nom', customExportHeader: 'nom' },
            { field: 'typeChampionnat', header: 'Type Championnat' },
            { field: 'equipe', header: 'Equipe' },
            { field: 'terrain', header: 'Terrain' },
            { field: 'arbitre', header: 'Arbitre' },
            { field: 'score', header: 'Score' },
        ];

        this.exportColumns = this.cols.map((col) => ({
            title: col.header,
            dataKey: col.field,
        }));
    }

    loadData() {
        this.ArbitreService.getAllArbitre().subscribe({
            next: (res) => {
                this.userlist = res.data;
            },
            error: (err) => {
                console.error(err);
            },
        });

        this.championnatService.getAllChampionnat().subscribe({
            next: (res) => {
                console.log(res.data);
                this.championnats = res.data;
                console.log(this.userlist.length);
                console.log(this.championnats);
                this.data = {
                    labels: ['Championnat', 'Arbitre', 'emptydata'],
                    datasets: [
                        {
                            data: [
                                this.championnats.length,
                                this.userlist.length,
                                100,
                            ],
                            backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
                            hoverBackgroundColor: [
                                '#64B5F6',
                                '#81C784',
                                '#FFB74D',
                            ],
                        },
                    ],
                };
            },
            error: (err) => {
                console.error(err);
            },
        });
    }

    exportExcel() {
        import('xlsx').then((xlsx) => {
            this.championnatService.getAllChampionnat().subscribe({
                next: (res) => {
                    this.championnats = res.data;
                },
            });
            const worksheet = xlsx.utils.json_to_sheet(this.championnats);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ['data'],
            };
            const excelBuffer: any = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array',
            });
            this.saveAsExcelFile(excelBuffer, 'CHAMPIONNATS');
        });
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE,
        });
        FileSaver.saveAs(
            data,
            fileName + '_' + new Date().getTime() + EXCEL_EXTENSION
        );
    }

    downloadPDF() {
        this.loadData();
        let doc = new jsPDF.default('l', 'pt');
        var img = new Image();
        img.src = 'assets/logo.png';
        doc.addImage(img, 'png', 100, 20, 100, 100);
        doc.setTextColor(0, 0, 139);
        var date = formatDate(new Date(), 'yyyy/MM/dd hh:mm a', 'en');
        doc.text(600, 70, 'KAWAR.TN');
        doc.text(600, 90, ' ' + date);
        doc.text(110, 110, 'KAWAR.TN');
        doc.setTextColor(255, 0, 0);
        doc.text(320, 130, 'Liste des championnats\n');
        doc.autoTable(this.exportColumns, this.championnats, {
            theme: 'grid',
            styles: {
                halign: 'left',
            },
            margin: {
                top: 180,
            },
        });
        doc.setTextColor(0, 0, 0);
        doc.text(250, 520, 'Société Anonyme au capital de 800000 DT');
        doc.text(250, 540, 'Adresse : Rue de l’Artisanat, Charguia 2, TUNISIE');
        doc.text(250, 560, 'Web :www.kawar.tn Mail: championnat@kawar.tn');
        doc.save('CHAMPIONNATS_' + new Date().getTime() + '.pdf');
    }

    downloadFile(championnats: any) {
        const replacer = (key: any, value: null) =>
            value === null ? '' : value; // specify how you want to handle null values here
        const header = Object.keys(championnats[0]);
        let csv = championnats.map((row: { [x: string]: any }) =>
            header
                .map((fieldName) => JSON.stringify(row[fieldName], replacer))
                .join(',')
        );
        csv.unshift(header.join(','));
        let csvArray = csv.join('\r\n');
        var blob = new Blob([csvArray], { type: 'text/csv' });
        saveAs(blob, 'CHAMPIONNATS_' + new Date().getTime() + '.csv');
    }

    addChampDialog() {
        this.submitted = false;
        this.championnat = new Championnat();
        this.updateDialog = true;
    }

    updateChampDialog(champ: Championnat) {
        this.championnat = { ...champ };
        this.updateDialog = true;
    }
    openNew() {
        this.championnat;
        this.submitted = false;
        this.updateDialog = true;
    }

    updateChamp() {
        if (this.championnat._id) {
            this.championnatService
                .updateChampionnat(this.championnat)
                .subscribe({
                    next: (res) => {
                        this.championnats[
                            this.findIndexById(this.championnat._id)
                        ] = res.data;
                    },
                });
        } else {
            this.submitted = true;
            this.championnatService.addChampionnat(this.championnat).subscribe({
                next: (res) => {
                    this.championnats.push(res.data);
                    this.championnats = [...this.championnats];
                    this.updateDialog = false;
                    this.championnat;  // reopen with ancien data
                },
            });
        }
    }

    deleteChamp(champ: Championnat) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + champ.nom + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.championnatService.deleteChampionnat(champ).subscribe({
                    next: (res) => {
                        this.championnats = this.championnats.filter(
                            (val) => val._id !== champ._id
                        );
                        console.log(res);
                    },
                });
            },
        });
    }

    log() {
        console.log(this.championnat.arbitre);
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.championnats.length; i++) {
            if (this.championnats[i]._id === id) {
                index = i;
                break;
            }
        }
        return index;
    }
}
