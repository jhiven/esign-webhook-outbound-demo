export interface WebhookResponse {
    id: string;
    documentStatusCode: string;
    documentCategoryId?: string | null;
    documentContentId: string | null;
    name: string;
    title: string;
    description: string;
    filePath: string;
    thumbnailPath: string;
    pageCount: number;
    pageWidth: number | null;
    pageHeight: number | null;
    isAllowDecline: boolean;
    signingModeCode: string | null;
    expirationDate: string | null;
    administratorId: string | null;
    documentDate: string | null;
    uploadedDate: string | null;
    assignedDate: string | null;
    signedDate: string | null;
    declinedDate: string | null;
    declinerId: string | null;
    declineReason: string | null;
    createdDate: string | null;
    updatedDate: string | null;
    createdBy: string | null;
    updatedBy: string | null;
    administrator: UserUserTypeResponse | null;
    decliner: UserUserTypeResponse | null;
    documentContent: DocumentContent | null;
    documentCategory: DocumentCategory | null;
    documentRecipients: DocumentRecipient[];
    totalSigner: number;
    totalSigned: number;
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
