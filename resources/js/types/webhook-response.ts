export interface WebhookResponse {
    Id: string;
    DocumentStatusCode: string;
    documentCategoryId?: string | null;
    Documentcontentid: string | null;
    Name: string;
    Title: string;
    Description: string;
    FilePath: string;
    Thumbnailpath: string;
    PageCount: number;
    Pagewidth: number | null;
    Pageheight: number | null;
    Isallowdecline: boolean;
    Signingmodecode: string | null;
    Expirationdate: string | null;
    Administratorid: string | null;
    Documentdate: string | null;
    Uploadeddate: string | null;
    Assigneddate: string | null;
    Signeddate: string | null;
    Declineddate: string | null;
    Declinerid: string | null;
    Declinereason: string | null;
    Createddate: string | null;
    Updateddate: string | null;
    Createdby: string | null;
    Updatedby: string | null;
    Administrator: UserUserTypeResponse | null;
    Decliner: UserUserTypeResponse | null;
    Documentcontent: DocumentContent | null;
    Documentcategory: DocumentCategory | null;
    Documentrecipients: DocumentRecipient[];
    Totalsigner: number;
    Totalsigned: number;
    filePath: string;
}

export interface UserUserTypeResponse {
    id: string;
    userId: string;
    userTypeId: string;
    roleId: string;
    user: User;
    role: Role;
    userType: UserType;
}

export interface User {
    id: string;
    username: string;
    name: string;
    email: string;
    language: Language;
    zone: Zone;
    developer: Developer;
    employee: Employee;
    isSuper: boolean;
    image: string;
}

export interface Language {
    id: string;
    name: string;
    code: string;
}

export interface Zone {
    id: string;
    offset: string;
    offsetMinute: number;
    label: string;
    tzCode: string;
}

export interface Developer {
    id: string;
    name: string;
    code: string;
    phone: string;
}

export interface Employee {
    id: string;
    nip: string;
    name: string;
    code: string;
    phone: string;
    genderCode: string;
    address: string;
    birthDate: string;
    hiredDate: string;
}

export interface Role {
    id: string;
    name: string;
    code: string;
    userType: UserType;
}

export interface UserType {
    id: string;
    name: string;
    code: string;
}

export interface DocumentContent {
    id: string;
    data: string;
    createdDate: string;
    updatedDate: string;
    createdBy: string;
    updatedBy: string;
}

export interface DocumentCategory {
    id: string;
    name: string;
    code: string;
    order: number;
    createdDate: string;
    updatedDate: string;
    createdBy: string;
    updatedBy: string;
}

export interface DocumentRecipient {
    id: string;
    documentId: string;
    userUserTypeId: string;
    recipientRoleCode: string;
    recipientReadStatusCode: string;
    signingOrder: number;
    createdDate: string;
    updatedDate: string;
    createdBy: string;
    updatedBy: string;
    userUserType: UserUserType;
    documentFields: DocumentField[];
    documentSignatures: DocumentSignature[];
}

export interface UserUserType {
    id: string;
    userId: string;
    userTypeId: string;
    roleId: string;
    user: User;
    role: Role;
    userType: UserType;
}

export interface DocumentField {
    id: string;
    documentId: string;
    documentRecipientId: string;
    fieldCode: string;
    isRequired: boolean;
    config: Config;
    style: Style;
    xValue: number;
    yValue: number;
    width: number;
    height: number;
    pageNumber: number;
    createdDate: string;
    updatedDate: string;
    createdBy: string;
    updatedBy: string;
    deletedBy: string;
    field: Field;
    isAutoFill: boolean;
}

export interface Config {
    isAutoFill: boolean;
    dateFormat: string;
    data: string;
}

export interface Style {
    fontFamily: string;
    fontSize: number;
    fontColor: string;
    isBold: boolean;
    isUnderline: boolean;
    isItalic: boolean;
    alignment: string;
    backgroundColor: string;
    borderColor: string;
}

export interface Field {
    id: string;
    name: string;
    code: string;
    order: number;
    createdDate: string;
    updatedDate: string;
    createdBy: string;
    updatedBy: string;
    isAutoFill: boolean;
    fieldUserTypes: FieldUserType[];
}

export interface FieldUserType {
    id: string;
    userTypeId: string;
    fieldId: string;
    isActive: boolean;
    createdDate: string;
    updatedDate: string;
    createdBy: string;
    updatedBy: string;
    userType: UserType;
}

export interface DocumentSignature {
    id: string;
    documentVersionId: string;
    documentRecipientId: string;
    reason: string;
    deviceInfo: string;
    createdDate: string;
    updatedDate: string;
    createdBy: string;
    updatedBy: string;
    documentVersion: DocumentVersion;
}

export interface DocumentVersion {
    id: string;
    documentId: string;
    version: number;
    filePath: string;
    createdDate: string;
    updatedDate: string;
    createdBy: string;
    updatedBy: string;
    document: string;
}
