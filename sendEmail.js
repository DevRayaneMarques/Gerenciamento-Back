import React, { useState, useEffect } from 'eact';
import { Container, Row, Col, Card, Button } from 'eact-bootstrap';
import { Line } from 'eact-chartjs-2';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import firebase from '../../Config/firebase';

const db = getFirestore(firebase);

const Conta = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const q = query(collection(db, 'transactions'), where('user', '==', 'user123'));
      const querySnapshot = await getDocs(q);
      const transactions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
       ...doc.data(),
      }));
      setTransactions(transactions);
    };
    fetchTransactions();
  }, [db]);

  const totalExpenses = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

  const chartData = {
    labels: transactions.map((transaction) => transaction.description),
    datasets: [
      {
        label: 'Despesas',
        data: transactions.map((transaction) => transaction.amount),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Minhas Despesas</h1>
          <Card>
            <Card.Body>
              <h5 className="card-title">Total de Despesas: R$ {totalExpenses.toFixed(2)}</h5>
              <Line data={chartData} />
            </Card.Body>
          </Card>
          <Button variant="primary" className="float-end">Adicionar Despesa</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Conta;