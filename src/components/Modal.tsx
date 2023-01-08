import * as React from 'react';
import { Dialog as ReachDialog } from '@reach/dialog';

interface ContextTypes {
  isOpen: boolean;
  setIsOpen: (data: boolean) => void;
}

const defaultContext = {
  isOpen: false,
  setIsOpen: () => {}
};

const callAll =
  (...fns: any) =>
  (...args: any) =>
    fns.forEach((fn: any) => fn && fn(...args));

const ModalContext = React.createContext<ContextTypes>(defaultContext);

function Modal({ children }: React.PropsWithChildren) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  return <ModalContext.Provider value={{ isOpen, setIsOpen }}>{children}</ModalContext.Provider>;
}

function ModalDismissButton({
  children
}: {
  children: React.ReactElement<React.PropsWithChildren<any>>;
}) {
  const { isOpen, setIsOpen } = React.useContext(ModalContext);
  return React.cloneElement(children, {
    onClick: callAll(() => setIsOpen(false), children.props.onClick)
  });
}

function ModalOpenButton({
  children
}: {
  children: React.ReactElement<React.PropsWithChildren<any>>;
}) {
  const { isOpen, setIsOpen } = React.useContext(ModalContext);
  return React.cloneElement(children, {
    onClick: callAll(() => setIsOpen(true), children.props.onClick)
  });
}

function ModalContentsBase(props: any) {
  const { isOpen, setIsOpen } = React.useContext(ModalContext);
  return <ReachDialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} />;
}

function ModalContents({
  title,
  children,
  ...props
}: React.PropsWithChildren<{ title: string } & any>) {
  return (
    <ModalContentsBase {...props}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ModalDismissButton>
          <button>
            <span aria-hidden>×</span>
          </button>
        </ModalDismissButton>
      </div>
      <h3 style={{ textAlign: 'center', fontSize: '2em' }}>{title}</h3>
      {children}
    </ModalContentsBase>
  );
}

export { Modal, ModalDismissButton, ModalOpenButton, ModalContents };
