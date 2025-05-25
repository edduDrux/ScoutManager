import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { map } from 'rxjs/operators';

interface Account {
  description: string;
  amount: number;
  status: string;
}

@Component({
  selector: 'app-financeiro',
  standalone: true,
  imports: [MatCardModule, MatTableModule, CommonModule],
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.css'],
})
export class FinanceiroComponent implements OnInit {
  currentBalance: number = 0;
  accounts: Account[] = [];
  displayedColumns: string[] = ['description', 'amount', 'status'];

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    // Buscar saldo
    const transactionsRef = collection(this.firestore, 'transactions');
    collectionData(transactionsRef).subscribe((transactions: any[]) => {
      this.currentBalance = transactions.reduce(
        (sum, t) => sum + (t.type === 'income' ? t.amount : -t.amount),
        0
      );
    });
    // Buscar contas
    const accountsRef = collection(this.firestore, 'accounts');
    collectionData(accountsRef)
      .pipe(
        // Map each document to the Account interface
        map((accounts: any[]) =>
          accounts.map(
            (account) =>
              ({
                description: account.description,
                amount: account.amount,
                status: account.status,
              } as Account)
          )
        )
      )
      .subscribe((accounts: Account[]) => {
        this.accounts = accounts;
      });
  }
}
