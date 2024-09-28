import { useEffect, useState } from 'react';
import ClientesTable from '../components/ClientesTable';
import { Button, Form, Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const ClienteYupFormik = () => {
  const schema = Yup.object().shape({
    nome: Yup.string().trim().min(1).max(15).required(),
    email: Yup.string().trim().min(1).max(30).required(),
    dtNasc: Yup.string().trim().length(10),
    cep: Yup.string(),
  });

  let [clientes, setClientes] = useState([]);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  let formData = {
    nome: '',
    email: '',
    dtNasc: '',
    cep: '',
  };

  useEffect(() => {
    console.log('Carregando clientes!');
    fetch('http://localhost:3000/clientes', { method: 'GET' })
      .then((res) => {
        res.json().then((data) => {
          setClientes([...data]);
        });
      })
      .catch((error) => {
        console.error('Erro ao carregar clientes:', error);
      });

  }, []);

  useEffect(() => {
    console.log('Modifiquei o cliente!');
  }, [clientes]);

  const handleSubmit = (values) => {
    // Enviar dados para a tabela.
    let novoCliente = { ...values };

    // Enviar os dados para o servidor de backend.
    fetch('http://localhost:3000/clientes', {
      method: 'POST',
      body: JSON.stringify(novoCliente),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Cadastro efetuado com sucesso!');

        setClientes([...clientes, novoCliente]);

        // Fechar modal.
        setShow(false);
      })
      .catch((error) => {
        console.error('Erro ao cadastrar Cliente:', error);
      });

  };

  const formik = useFormik({
    initialValues: formData,
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Button className="m-2" variant="primary" onClick={handleShow}>
        +
      </Button>

      <ClientesTable clientes={clientes}></ClientesTable>

      <Modal show={show} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Cliente</Modal.Title>
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.nome}
                type="text"
                placeholder="Digite o Nome"
                name="nome"
              />

              <span>{formik.errors.nome}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.email}
                type="text"
                placeholder="example@email.com"
                name="email"
              />
              <span>{formik.errors.email}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Data Nascimento</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.dtNasc}
                type="text"
                placeholder="dd/mm/aaaa"
                name="dtNasc"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Cep</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.cep}
                type="text"
                placeholder="Digite o Cep"
                name="cep"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleShow} type="button">
              Fechar
            </Button>
            <Button variant="primary" type="submit">
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ClienteYupFormik;
