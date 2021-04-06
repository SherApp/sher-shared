export interface User {
  emailAddress: string;
  roles: string[];
}

export interface RegistrationSettings {
  requiresInvitationCode: boolean;
}
