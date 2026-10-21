# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
from __future__ import annotations

from typing import Literal

import pytest

from airflow.api_fastapi.core_api.datamodels.plugins import ExternalViewResponse, ReactAppResponse


@pytest.mark.parametrize("destination", ["dag_overview", "task_overview"])
def test_react_app_accepts_overview_destination(
    destination: Literal["dag_overview", "task_overview"],
) -> None:
    react_app = ReactAppResponse(name="overview", bundle_url="/overview.js", destination=destination)

    assert react_app.destination == destination


def test_external_view_open_in_new_tab_defaults_to_true() -> None:
    external_view = ExternalViewResponse(name="my view", href="https://example.com")

    assert external_view.open_in_new_tab is True


def test_external_view_open_in_new_tab_round_trips_false() -> None:
    external_view = ExternalViewResponse(name="my view", href="https://example.com", open_in_new_tab=False)

    assert external_view.open_in_new_tab is False
