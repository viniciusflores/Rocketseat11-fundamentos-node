import Transaction from '../models/Transaction'

interface Balance {
  income: number
  outcome: number
  total: number
}

interface CreateTransactionDTO {
  title: string
  value: number
  type: 'income' | 'outcome'
}

class TransactionsRepository {
  private transactions: Transaction[]

  constructor() {
    this.transactions = []
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    let income = 0
    let outcome = 0
    this.transactions.map(t => {
      if (t.type === 'income') {
        income += t.value
      } else if (t.type === 'outcome') {
        outcome += t.value
      } else {
        throw Error('Type invalid for transaction')
      }
    })
    const total = income - outcome

    const balance = {
      income,
      outcome,
      total,
    }

    return balance
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type })
    this.transactions.push(transaction)
    return transaction
  }
}

export default TransactionsRepository
