"use client";
import { Button } from "./button";
import { Modal } from "./modal";
export function ConfirmDialog({ open, onClose, onConfirm, title, description, confirmLabel = "Ya, lanjutkan", loading }: { open: boolean; onClose: () => void; onConfirm: () => void; title: string; description: string; confirmLabel?: string; loading?: boolean }) { return <Modal open={open} onClose={onClose} title={title}><p className="text-text-muted">{description}</p><div className="mt-6 flex justify-end gap-3"><Button variant="secondary" onClick={onClose}>Kembali</Button><Button variant="danger" loading={loading} onClick={onConfirm}>{confirmLabel}</Button></div></Modal>; }
