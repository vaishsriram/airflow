/*!
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { ExternalViewResponse } from "openapi/requests/types.gen";

import { Menu } from "src/system-components";

import { Wrapper } from "src/utils/Wrapper";

import { PluginMenuItem } from "./PluginMenuItem";

// Dropdown-menu rendering (as opposed to topLevel) requires an open Menu.Content to query
// into; defaultOpen renders it immediately so the test doesn't need to simulate a click.
const renderInOpenMenu = (plugin: ExternalViewResponse) =>
  render(
    <Menu.Root defaultOpen>
      <Menu.Trigger>
        <button type="button">trigger</button>
      </Menu.Trigger>
      <Menu.Content>
        <PluginMenuItem {...plugin} />
      </Menu.Content>
    </Menu.Root>,
    { wrapper: Wrapper },
  );

const makePlugin = (overrides: Partial<ExternalViewResponse> = {}): ExternalViewResponse => ({
  destination: "nav",
  href: "https://example.com",
  name: "My Plugin",
  ...overrides,
});

describe("PluginMenuItem", () => {
  it("opens in a new tab by default", () => {
    renderInOpenMenu(makePlugin());

    const link = screen.getByRole("menuitem", { name: "My Plugin" });

    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("opens in the current tab when open_in_new_tab is false", () => {
    renderInOpenMenu(makePlugin({ open_in_new_tab: false }));

    const link = screen.getByRole("menuitem", { name: "My Plugin" });

    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("rel");
  });

  it("opens in a new tab when open_in_new_tab is explicitly true", () => {
    renderInOpenMenu(makePlugin({ open_in_new_tab: true }));

    const link = screen.getByRole("menuitem", { name: "My Plugin" });

    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
