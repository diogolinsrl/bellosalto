export class city {

  name: string;
}

export class state {

  name: string;
}

export class AddressResponse {

  street: string;
  number: string;
  complement: string;
  zip_code: string;
  neighborhood: string;
  city: city;
  state: state;
}

export class CustomerResponse {

    id: string;
    name: string;
    company_name: string;
    email: string;
    business_phone: string;
    mobile_phone: string;
    person_type: string;
    document: string;
    identity_document: string;
    state_registration_number: string;
    state_registration_type: string;
    city_registration_number: Date;
    date_of_birth: string;
    notes: string;
    address = new AddressResponse();

    public constructor(init?: Partial<CustomerResponse>) {
      Object.assign(this, init);
    }
}

export class AddressRequest {

  zip_code: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
}

export class Contact {

  name: string;
  business_phone: string;
  email: string;
  job_title: string;
}

export class CustomerRequest {

    name: string;
    company_name: string;
    email: string;
    business_phone: string;
    mobile_phone: string;
    person_type: string;
    document: string;
    identity_document: string;
    state_registration_number: string;
    state_registration_type: string;
    city_registration_number: Date;
    date_of_birth: string;
    notes: string;
    contacts: Contact[];
    address = new AddressRequest();

    public constructor(init?: Partial<CustomerResponse>) {
      Object.assign(this, init);
    }
}

export class AddressUpdate {

  zip_code: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
}

export class CustomerUpdate {

    name: string;
    company_name: string;
    email: string;
    business_phone: string;
    mobile_phone: string;
    document: string;
    identity_document: string;
    state_registration_number: string;
    state_registration_type: string;
    city_registration_number: Date;
    date_of_birth: string;
    notes: string;
    address = new AddressUpdate();

    public constructor(init?: Partial<CustomerResponse>) {
      Object.assign(this, init);
    }
}

export class SaleResponse {

  id: string;
  number: number;
  emission: string;
  status: string;
  scheduled: boolean;
  customer: SaleCustomer;
  discount: Discount;
  product_discount: Discount;
  service_discount: Discount;
  payment: Payment;
  payment_terms: string;
  notes: string;
  shipping_cost: number;
  total: number;
  seller: Seller;

  public constructor(init?: Partial<SaleResponse>) {
    Object.assign(this, init);
  }
}

export class SaleCustomer {

  id: string;
  name: string;
  company_name: string;
  email: string;
  person_type: string;
}

export class Discount {

  measure_unit: string;
  rate: number;
}

export class Payment {

  type: string;
  installments: Installment[];
}

export class Seller {

  id: string;
  name: string;
}

export class Installment {

  number: number;
  value: number;
  due_date: string;
  status: string;
}

export class SaleUpdate {

  number: number;
  emission: string;
  customer_id: string;
  products: SaleProduct[];
  services: SaleService[];
  discount: Discount;
  payment: PaymentUpdate;
  payment_terms: string;
  notes: string;
  shipping_cost: number;
}

export class SaleProduct {

  description: string;
  quantity: number;
  product_id: string;
  value: number;
}

export class SaleService {

  description: string;
  quantity: number;
  service_id: string;
  value: number;
}

export class PaymentUpdate {

  type: string;
  installments: Installment[];
}

export class NegotiationItem {

  description: string;
  quantity: number;
  item: Item;
  item_type: string;
  value: number
}

export class Item {

  id: string;
  name: string;
  value: number;
  cost: number
}