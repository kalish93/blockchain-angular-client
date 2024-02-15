export interface Organization{
    id?: string;
    name:string;
    shortName:string;
    isActive?:boolean;
    userId?: string;
};

export interface Member{
    id?:string;
    name:string;
    email:string;
    organizationId:string;
};

export interface OrganizationWithMembers extends Organization{
    members:Member[];
};
