export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface MobileMenuProps {
  onLogin: () => void;
  onRegister: () => void;
}

export interface AuthModalState {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
}
