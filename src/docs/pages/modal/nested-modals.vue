<template>
  <div>
    <fd-button @click="$fdModal.open('outer')" styling="emphasized">
      Open Modal
    </fd-button>

    <FdModal name="outer" title="Outer Modal">
      This is the first modal! Click the button below to open the second modal.

      <fd-button slot="actions" @click="$fdModal.open('nested')" styling="emphasized">
        Open Nested Modal
      </fd-button>
    </FdModal>

    <FdModal name="nested" title="Nested Modal">
      <template #default>
        This is a nested Modal.
      </template>

      <template #actions="{close}">
        <fd-button slot="actions" @click="close" styling="emphasized">
          Close Nested Modal
        </fd-button>
      </template>
    </FdModal>
  </div>
</template>
